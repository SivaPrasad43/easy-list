/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import './Home.scss'

import PhotosData from './data/photos.json'
import VideosData from './data/videos.json'


const Home = () => {
    return (
        <div className="home_container">
            <div className="list_box">
                <div className="list_title">List</div>
                <div className="list_container">
                    <ul>
                        <ItemContainer 
                            title={PhotosData.title} 
                            data={PhotosData.data}
                            icon={PhotosData.icon}
                            bgColor={PhotosData.bgColor}
                        />
                        <ItemContainer 
                            title={VideosData.title} 
                            data={VideosData.data}
                            icon={VideosData.icon}
                            bgColor={VideosData.bgColor}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

const ItemContainer = ({title,data,icon,bgColor}) => {
    const [expanded, setExpanded] = useState(false);
    const [categoryItems, setCategoryItems] = useState([]);
    const [activeItem,setActiveItem] = useState("All");
    const [cardData,setCardData] = useState([])
  
    const handleClick = () => {
      setExpanded(!expanded);
    };

    useEffect(() => {
        console.log(data);
        setCardData(data)
        const uniqueFormats = [...new Set(data?.map(item => item.format))];
        setCategoryItems(['All', ...uniqueFormats]);
    },[data]);

    useEffect(()=>{
        if(activeItem === "All"){
            setCardData(data)
        }else{
            const filteredData = data?.filter(item=>item.format === activeItem)
            setCardData(filteredData)
        }
    },[activeItem])
  
    return (
      <li>
        <div className="item_container" onClick={handleClick}>
          <div className="item_title">
            <i className="fi fi-rr-folder"></i>
            <p>{title}</p>
          </div>
          <i className={`fi fi-ss-angle-small-${expanded ? "up" : "down"}`}></i>
        </div>
        {expanded && (
          <div className="item_expand">
            <div className="category_container">
              <ul>
                {
                    categoryItems.map((item,index)=>(
                        <li key={index}>
                        <div 
                            className={`category_item ${activeItem === item ? "category_active" : ""}`}
                            onClick={()=>{
                                setActiveItem(item)
                            }}
                        >
                          <div className="category_title">{item}</div>
                        </div>
                      </li>
                    ))
                }
              </ul>
            </div>
            <div className="card_container">
                {
                    cardData.map((item,index)=>(
                        <Cards
                            key={index}
                            size={item.size}
                            url={item.url}
                            img={icon}
                            bgColor={bgColor}
                        />
                    ))
                }
            </div>
          </div>
        )}
      </li>
    );
};

const Cards = ({size,img,bgColor})=> {
    return(
        <div className="item_expand_card">
        <div className="icon_container" style={{backgroundColor:bgColor}}>
        <i className={`fi ${img}`}></i>
        </div>
        <div className="item_size">{size}</div>
        <a href='#' className="download_btn">Download</a>
      </div>
    )
}

export default Home
