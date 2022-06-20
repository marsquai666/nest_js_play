import {GetServerSideProps, NextPage} from 'next';
import axios, { AxiosResponse } from 'axios';
import { InputHTMLAttributes, MouseEvent, useContext, useRef, useState } from 'react';

const API_HOST = 'http://localhost:3000'

type CustomerData = {
  id: number
  name: string
  age: number
  email: string
  isActive: boolean
}

type CreateCustomerDTO = {
  name: string,
  email: string,
  age: number
}

type Props = {
  customers: Array<CustomerData>
}

const Customers = (props: Props) => {

  const [customersData, setCustomersData] = useState<Array<CustomerData>>(props.customers);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);

  const addButtonHandler = async (e: MouseEvent) => {
    e.preventDefault();
    const response = await axios.post<CustomerData, AxiosResponse<CustomerData>, CreateCustomerDTO>(
      `${API_HOST}/customers/`,
      {
        name: nameInputRef.current!.value,
        email: emailInputRef.current!.value,
        age: Number(ageInputRef.current!.value)
      }
    );

    setCustomersData([response.data, ...customersData]);
  }
  return (
    <div>
      <input ref={nameInputRef}></input>
      <input ref={emailInputRef}></input>
      <input ref={ageInputRef} type={'number'}></input>
      <button onClick={addButtonHandler}>追加</button>
      all Customers
      {customersData.map((customer, key) => {
        return (<div key={key}>{customer.name}</div>)
      })}
    </div>
  )
}

export const getServerSideProps:GetServerSideProps<Props, {}, {}> = async (context) => {
  const response = await axios.get<CustomerData, AxiosResponse<Array<CustomerData>>, {}>(`${API_HOST}/customers/`);

  return {
    props: {
      customers: response.data
    }, // will be passed to the page component as props
  }
}

// export async function getStaticProps(){
//   console.log("executed in getStaticProps");
//   console.log(global);
//   return {
//     props: {}
//   }
// }

export default Customers;