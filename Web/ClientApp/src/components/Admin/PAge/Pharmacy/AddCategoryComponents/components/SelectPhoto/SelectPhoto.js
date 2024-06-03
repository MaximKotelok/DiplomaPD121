import React, { useEffect, useState } from "react";
import styles from "./SelectPhoto.module.css";
import StatickPhoto from "../../../../../../../assets/images/StatickPhoto.svg";
// import BtnWarningModal from "../../../Common/BtnWarningModal/BtnWarningModal";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ApiPath } from "../../../../../../../utils/Constants";
import CustomImgComponent from "../../../../../../Common/CustomImgComponent/CustomImgComponent"

import placeholder from "../../../../../../../assets/images/placeholder.png";

const VisuallyHiddenInput = styled("input")({
    clip: "rgba(229, 229, 234, 1)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const StyledButton = styled(Button)({
    width: "250px !important",
    height: "42px",
    color: "rgba(122, 122, 122, 1)",
    backgroundColor: "rgba(229, 229, 234, 1)",
    borderRadius: "16px",
    // padding: "12px 12px",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "var(--sans-serif)",
    // marginLeft: "50px",
    //   margin: "0 auto",
    "&:hover": {
        color: "rgba(122, 122, 122, 1)", // Колір тексту при наведенні
        backgroundColor: "rgba(229, 229, 234, 1)", // Колір фону при наведенні
    },
});

export const SelectPhoto = ({ text, handleImageChange, pathToPhoto }) => {
    const [imageSrc, setImageSrc] = useState(StatickPhoto);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageSrc(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }

        handleImageChange(file);
    };

    useEffect(() => {
        setImageSrc(ApiPath + pathToPhoto);
    }, [])

    return (
        <div>
            <div className={`col-4 d-flex  flex-column  w-100`}>
                <label className={`${styles["label-head"]}`}>{text}</label>
                <div
                    className={`d-flex  justify-content-start  align-items-center row `}
                >
                    <div className="col-6">
                        <CustomImgComponent
                            src={imageSrc}
                            alt="no photo"
                            className={`${styles["img-product"]} mb-2`}
                        />
                    </div>
                    <div className="col-6">
                        <StyledButton
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                        >
                            Оберіть файл
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </StyledButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
