import React from "react";
import "./Avatar.css";
import PropTypes from "prop-types";

const AvatarComponennt = ({ text, email, imageUrl }) => {
  return (
    <div className="d-flex align-items-center">
      <img
        src="https://cdn.vox-cdn.com/thumbor/2E78dg_Cpbdh3nv6z0KKhOhYs6c=/0x0:1100x580/1200x800/filters:focal(520x151:696x327)/cdn.vox-cdn.com/uploads/chorus_image/image/71921482/bkq6gtrpcnw43vsm5zm62q3z.0.png"
        alt="Avatar"
        className="rounded-circle mr-3 avatar"
        // style={{ width: "50px", height: "50px" }}
      />
      <div style={{ gap: '4px' }}>
        <div className="font-weight-bold font-size-lg text-dark nikname-text">Сергій</div>
        <div className="font-size-sm text-secondary roll-text">Адміністратор</div>
      </div>
    </div>
  );
};

// Avatar.propTypes = {
//   text: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   imageUrl: PropTypes.string.isRequired,
// };

export default AvatarComponennt;
