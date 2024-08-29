import {Card} from "antd"
// import dotenv from 'dotenv'
// dotenv.config();
function CryptocurrencyCard(props) {
    const { currency } = props;
    const serverUrl = import.meta.env.VITE_REACT_COINMARKETCAP_URL;
    console.log("serverUrl", serverUrl);
    
    return (
        <div>
           {currency &&  <Card
                title={
                    <div className="flex items-center gap-3">
                        <img src={`${serverUrl}/static/img/coins/64x64/${currency.id}.png`} />
                        <span>{currency.name}</span>
                    </div>
                }
                style={{
                    width: 300,
                }}
            >
                <p>Current price: {currency.quote.USD.price}</p>
                <p></p>
            </Card>}
        </div>
    );
}

  
  export default CryptocurrencyCard
  