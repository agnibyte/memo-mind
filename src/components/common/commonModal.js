import React from "react";

import { Modal, Button, ModalHeader, ModalBody } from "reactstrap";
import modalStyle from "@/styles/modal.module.scss";

export default function CommonModal({
	modalOpen,
	setModalOpen,
	modalTitle = "",
	className = "",
	modalClassName = "",
	children,
	backDrop = false,
	handleBackButtonClick,
	showBackButton,
}) {
	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};

	console.log('modalTitle', modalTitle, modalTitle=="")
	return (
		<Modal
			isOpen={modalOpen}
			toggle={toggleModal}
			className={"modal-dialog-centered " + className}
			modalClassName={modalClassName + " " + modalStyle["modal"]}
			backdrop={backDrop ? "static" : true}
			keyboard={!backDrop}
		>
			{modalTitle != "" && (
				<ModalHeader className={modalStyle["modal-header"] + " modal-header"}>
					{showBackButton && (
						<span
							className={modalStyle["lensBackArrow"]}
							aria-label="Back Arrow"
							onClick={handleBackButtonClick}
						></span>
					)}
					{modalTitle}
				</ModalHeader>
			)}
			{!backDrop && (
				<Button
					type="button"
					className={"close close-button " + modalStyle["btn-close"]}
					onClick={toggleModal}
				/>
			)}
			<ModalBody className={modalStyle["modal-body"]}>
				{modalOpen &&
					React.cloneElement(children, {
						toggleModal,
					})}
			</ModalBody>
		</Modal>
	);
}
