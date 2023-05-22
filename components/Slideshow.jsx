import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Paper,
} from '@mui/material'
import Image from 'next/image';
import styles from "@/styles/Slideshow.module.css";


const Slideshow = ({items}) => {

    return (
        <div>
       
            <Carousel
                className={styles.slidShowContainer}
              
                autoPlay={false}
                navButtonsAlwaysVisible={true}
                indicators={false}
                cycleNavigation={true}
                // duration={500}
                // sx={{
                //     autoPlay:true,
                //     animation:"fade",
                //     indicators:false,
                //     duration:500,
                //     navButtonsAlwaysVisible: true,
                //     navButtonsAlwaysInvisible: false,
                //     cycleNavigation: true,
                //     fullHeightHover: true,
                //     swipe: true

            
              
            >
                {
                    items.map((item, index) => (   <Paper
                        className={styles.slidShow}
                       
                        elevation={10}
                        key={index}
                    >
                       <img src={item} alt="img" maxWith="100%" 
                       width="100%"
                  
                      height="400"/>
                    </Paper>))
                  
                }
            </Carousel>
         
        </div>
    )
}

export default Slideshow;