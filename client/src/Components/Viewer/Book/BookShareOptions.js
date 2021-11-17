import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
  PinterestShareButton,
  FacebookMessengerShareButton,
} from "react-share";


function BookShareOptions({ pageUrl }) {
  return (
    <>
      <FacebookShareButton url={pageUrl} hashtag={"#Obosor"}>
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={pageUrl}>
        <FacebookMessengerIcon size={30} round={true} />
      </FacebookMessengerShareButton>
      <WhatsappShareButton url={pageUrl}>
        <WhatsappIcon size={30} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton url={pageUrl}>
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton url={pageUrl}>
        <LinkedinIcon size={30} round={true} />
      </LinkedinShareButton>
      <PinterestShareButton url={pageUrl}>
        <PinterestIcon size={30} round={true} />
      </PinterestShareButton>
      <RedditShareButton url={pageUrl}>
        <RedditIcon size={30} round={true} />
      </RedditShareButton>
      <EmailShareButton url={pageUrl} >
        <EmailIcon size={30} round={true} />
      </EmailShareButton>
    </>
  );
}

export default BookShareOptions;
