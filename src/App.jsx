import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';
import axios from 'axios';
import CryptocurrencyCard from './components/cryptocurrencyCard';
// import dotenv from 'dotenv'
// dotenv.config();

function getItem(label, key, icon, children, type){
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

const App = () => {
  const [currencies, setCurrencies] = useState([])
  const [currencyId, setCurrencyId] = useState(1)
  const [currencyData, setCurrencyData] = useState(null)
  const serverUrl = import.meta.env.VITE_REACT_APP_BACKEND_ENV;

  const fetchCurrencies = () => {
    axios.get(`${serverUrl}/cryptocurrencies`).then(r => {
      const currenciesResponse = r.data;
      const menuItems = [
        getItem('List of cryptocurrencies', 'g1', null, currenciesResponse.map(c => {
          return {label: c.name, key: c.id}
          }),
          'group'
        )
      ]
      setCurrencies(menuItems)
      })
  }



  const fetchCurrency = () => {
    axios.get(`${serverUrl}/cryptocurrencies/${currencyId}`).then(r => {
      setCurrencyData(r.data)
    })
  }

  useEffect( () => {
    fetchCurrencies()
  }, []);

  useEffect( () => {
    setCurrencyData(null)
    fetchCurrency()
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(e.key)
  };

  return (
    <div className='flex '>
        <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={currencies}
      className='h-screen overflow-scroll'
    />
    <div className='mx-auto my-auto'>
      {currencyData ? <CryptocurrencyCard currency={currencyData}/>: <Spin size="large"/>}
    </div>
    </div>
  );
};
export default App;