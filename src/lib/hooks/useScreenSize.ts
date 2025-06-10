import { useState, useEffect } from 'react';

// const useScreenSize = () => {
  
//   const [width, setWidth] = useState(0)
//   const [height, setHeight] = useState(0)

//   const [screenSize, setScreenSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//     // width: width,
//     // height: height,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWidth(window.innerWidth);
//       setHeight(window.innerHeight);
//       setScreenSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//         // width: width,
//         // height: height,
//       });
//     };

//     window.addEventListener('resize', handleResize);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
//   // }, [window.innerWidth,window.innerHeight]);
//   // }, [width, height]);

//   return screenSize;
// };

// export default useScreenSize;


const useScreenSize = () => {

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // return [width, height]
  return {width:width, height:height}

}

export default useScreenSize 
