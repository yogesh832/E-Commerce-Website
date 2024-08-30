import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../Components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people experience our industry.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of products that meet the highest standards of quality and innovation.</p>
          <b className='text-xl py-4'>Our Mission</b>
<p className='text-gray-600'>
  Our mission is to empower individuals and communities by providing innovative, high-quality products that enhance their lives. We strive to be a leader in our industry by continuously evolving and adapting to the needs of our customers, while maintaining a steadfast commitment to excellence, integrity, and sustainability. We believe in the power of innovation and are dedicated to pushing the boundaries of what’s possible, ensuring that our offerings not only meet but exceed expectations.
</p>

        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our rigorous standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free shopping experience, we prioritize your convenience at every step.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you with any questions or concerns.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
    
  );
};

export default About;
