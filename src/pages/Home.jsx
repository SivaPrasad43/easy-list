/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import './Home.scss'

import PhotosData from './data/photos.json'
import VideosData from './data/videos.json'
import AudiosData  from './data/audio.json'


const Home = () => {
  return (
    <div className="home_container">
      <div className="list_box">
        <div className="list_title">Samples</div>
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
            <ItemContainer
              title={AudiosData.title}
              data={AudiosData.data}
              icon={AudiosData.icon}
              bgColor={AudiosData.bgColor}
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

const ItemContainer = ({ title, data, icon, bgColor }) => {
  const [expanded, setExpanded] = useState(false);
  const [categoryItems, setCategoryItems] = useState([]);
  const [activeItem, setActiveItem] = useState("All");
  const [cardData, setCardData] = useState([])
  const [loading, setLoading] = useState(true)

  const [minSize, setMinSize] = useState(1)
  const [maxSize, setMaxSize] = useState(10000)

  const sizeArray = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

  const handleClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setCardData(data)
    const uniqueFormats = [...new Set(data?.map(item => item.format))];
    setCategoryItems(['All', ...uniqueFormats]);
    setLoading(false)
    return(
      setMinSize(1),
      setMaxSize(10000)
    )
  }, [expanded]);

  function filterDatas(){
    if (activeItem === "All") {
      setCardData(data?.filter(item => item.size >= minSize && item.size <= maxSize))
    } else {
      const filteredData = data?.filter(item => item.format === activeItem && item.size >= minSize && item.size <= maxSize)
      setCardData(filteredData)
    }
  }

  useEffect(() => {
    filterDatas()
  }, [activeItem])

  useEffect(() => {
    const filteredData = cardData?.filter(item => item.size >= minSize && item.size <= maxSize)
    setCardData(filteredData)
    filterDatas()
  }, [minSize, maxSize])

  function formatFileSize(sizeInKB) {
    if (sizeInKB < 1024) {
      return sizeInKB + " KB";
    } else if (sizeInKB < 1048576) {
      const sizeInMB = (sizeInKB / 1024).toFixed(0);
      return sizeInMB + " MB";
    } else {
      const sizeInGB = (sizeInKB / 1048576).toFixed(2);
      return sizeInGB + " GB";
    }
  }

  function handleMinChange(e) {
    setMinSize(e.target.value)
  }

  function handleMaxChange(e) {
    setMaxSize(e.target.value)
  }

  return (
    <li>
      <a href={`#${title}`}>
        <div id={title} className="item_container" onClick={handleClick}>
          <div className="item_title">
            <i className="fi fi-rr-folder"></i>
            <p>{title}</p>
          </div>
          <i className={`fi fi-ss-angle-small-${expanded ? "up" : "down"}`}></i>
        </div>
      </a>
        {expanded && (
          <div className="item_expand">
            <div className="category_container">
              <ul>
                {
                  categoryItems.map((item, index) => (
                    <CategoryItem
                      key={index}
                      item={item}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                    />
                  ))
                }
              </ul>
              <div className="size_container">
                <p>Size:</p>
                <div className="size_box">
                  <div className='size_title'>Min</div>
                  <select name="min" id="min" value={minSize} onChange={handleMinChange}>
                    {
                      sizeArray.map((item, index) => (
                        <option key={index} value={item}>{formatFileSize(item)}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="size_box">
                  <div className='size_title'>Max</div>
                  <select name="max" id="max" value={maxSize} onChange={handleMaxChange}>
                    {
                      sizeArray.map((item, index) => (
                        <option key={index} value={item}>{formatFileSize(item)}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
            {
              loading ? (
                <p>Loading..</p>
              ) : (
                <div className="card_container">
                  {
                    cardData.map((item, index) => (
                      <Cards
                        key={index}
                        size={formatFileSize(item.size)}
                        format={item.format}
                        url={item.url}
                        img={icon}
                        bgColor={bgColor}
                      />
                    ))
                  }
                  {
                    cardData.length === 0 && <p>File not exist !</p>
                  }
                </div>
              )
            }
          </div>
        )}
    </li>
  );
};

const CategoryItem = ({ item, activeItem, setActiveItem }) => {
  return (
    <li>
      <div
        className={`category_item ${activeItem === item ? "category_active" : ""}`}
        onClick={() => {
          setActiveItem(item)
        }}
      >
        <div className="category_title">{item}</div>
      </div>
    </li>
  )
}

const Cards = ({ size, format, url, img, bgColor }) => {
  return (
    <div className="item_expand_card">
      <div className="icon_container" style={{ backgroundColor: bgColor }}>
        <i className={`fi ${img}`}></i>
      </div>
      <div className="item_details">
        <div className="item_size">{size}</div>
        <i className="fi fi-ss-bullet"></i>
        <div className="item_format">{format}</div>
      </div>
      <a href={url} className="download_btn">
        <i className="fi fi-rr-download"></i>
        Download</a>
    </div>
  )
}

export default Home
