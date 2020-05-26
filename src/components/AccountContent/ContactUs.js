import React, { useState } from 'react';
import axios from 'axios';
import { useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const contactReason = [
  'Other',
  'Refund',
  'Error with the site',
  'Issue with your order',
];

const MyForm = () => {
  const data = useStaticQuery(graphql`
    query StaticMapQuery {
      allStaticMap {
        nodes {
          childFile {
            childImageSharp {
              fixed(height: 300, width: 500, quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          mapUrl
        }
      }
    }
  `);

  console.log(data.allStaticMap);
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      form.reset();
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });
    axios({
      method: 'post',
      url:
        'https://getform.io/f/e836a6fb-2698-4da8-9383-450876f5a4b5',
      data: new FormData(form),
    })
      .then((r) => {
        handleServerResponse(true, 'Thanks!', form);
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, form);
      });
  };
  return (
    <div className="ContactUs">
      <div className="ContactUs-left">
        <a href={data.allStaticMap.nodes[0].mapUrl} target="_blank">
          <Img
            fixed={
              data.allStaticMap.nodes[0].childFile.childImageSharp
                .fixed
            }
            className="ContactUs-left-map"
          />
        </a>
        <div className="ContactUs-left-details">
          <div>
            <a href="tel:44345678903">+44 345 678 903</a>
          </div>
          <div>
            <a href="mailto:info@eragon.com">info@eragon.com</a>
          </div>
        </div>
      </div>

      <div className="ContactUs-right">
        <h3>Contact Us</h3>
        <form onSubmit={handleOnSubmit}>
          <div className="ContactUs-right-form-group">
            <div>
              <label for="exampleInputEmail1" required="required">
                Email address
              </label>
            </div>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="ContactUs-right-form-group">
            <div>
              <label for="exampleInputName">Name</label>
            </div>
            <input
              type="text"
              name="name"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your name"
              required="required"
            />
          </div>
          <div className="ContactUs-right-form-group">
            <div>
              <label for="exampleFormControlSelect1">
                Your Reason For Contacting Us
              </label>
            </div>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              name="platform"
              required="required"
            >
              {contactReason.map((reason) => {
                return <option>{reason}</option>;
              })}
            </select>
          </div>
          <div className="ContactUs-right-form-group">
            <div>
              <label for="exampleFormControlSelect1">
                Your Message
              </label>
            </div>
            <textarea
              type="text"
              name="message"
              placeholder="Message"
            />
          </div>
          <div className="ContactUs-right-form-group">
            <label for="exampleFormControlSelect1">
              Upload a file
            </label>
            <input type="file" name="file" />
          </div>
          <button
            type="submit"
            className="ContactUs-right-submit-btn"
            disabled={serverState.submitting}
          >
            Submit
          </button>
          {serverState.status && (
            <p className={!serverState.status.ok ? 'errorMsg' : ''}>
              {serverState.status.msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyForm;
