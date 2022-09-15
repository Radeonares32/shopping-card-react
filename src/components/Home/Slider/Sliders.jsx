import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
export default function Sliders(){
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  
  return (
    <div>
      <ReactSimplyCarousel
      autoplay={true}
      delay={1500}
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: '#F57F17',
            border: 'none',
            borderRadius: '50%',
            color: '#FBFFC0',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: '#F57F17',
            border: 'none',
            borderRadius: '50%',
            color: '#FBFFC0',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 2,
            itemsToScroll: 2,
            minWidth: 768,
          },
        ]}
        speed={700}
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        <div style={{ width: 800, height: 300, background: '#451A00' }} className='text-center'>
          <div style={{ margin: 120, fontSize: 45 }}>
            Slider 1
          </div>
        </div>
        <div style={{ width: 800, height: 300, background: '#451A00' }}>
        <div style={{ margin: 120, fontSize: 45 }}>
            Slider 2
          </div>
        </div>
        <div style={{ width: 800, height: 300, background: '#451A00' }}>
        <div style={{ margin: 120, fontSize: 45 }}>
            Slider 3
          </div>
        </div>
       
   
      </ReactSimplyCarousel>
    </div>
  );
}




