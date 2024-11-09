import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const form = useRef();

  const onReCAPTCHAChange = (token) => {
    setRecaptchaToken(token);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setMessage('Please complete the reCAPTCHA');
      return;
    }

    emailjs.sendForm('service_go85cgq', 'template_zjh82na', form.current, 'n3cGJxtvclpiQjFrD')
      .then((result) => {
          console.log(result.text);
          setMessage('Your message has been received');
      }, (error) => {
        setMessage('Error sending message, please email hello@swiftukproperties.co.uk');
          console.log(error.text);
      });
  };

  return (
    <Wrapper id="contact">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Get a quote</h1>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              {message}
              <Form onSubmit={sendEmail} ref={form} id="contactForm">
                <label className="font13">First name:</label>
                <input required type="text" name="fname" className="font20 extraBold" />
                <label className="font13">Email:</label>
                <input required type="email" name="user_email" className="font20 extraBold" />
                <label className="font13">Subject:</label>
                <input required type="text" name="subject" className="font20 extraBold" />
                <textarea rows="4" cols="50" type="text" id="message" name="message" className="font20 extraBold" />

                <ReCAPTCHA
                  sitekey="6LfV9nkqAAAAAKJA-KJdoNsvQDXNTbBDIxkDXKbp"
                  onChange={onReCAPTCHAChange}
                />
              
                <SubmitWrapper className="flex">
                  <ButtonInput type="submit" value="Send" className="pointer animate radius8" style={{ maxWidth: "220px" }} />
                </SubmitWrapper>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const Form = styled.form`
  padding: 70px 0 30px 0;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;

const ButtonInput = styled.input`
  border: 1px solid #7620ff;
  background-color: #7620ff !important;
  width: 100%;
  height: 50px !important;
  padding: 15px !important;
  outline: none;
  color: #fff;
  :hover {
    background-color: #580cd2 !important;
    border: 1px solid #7620ff;
    color: #fff;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;

const SubmitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;
