import type React from "react";
import { useState } from "react";

// Definimos los tipos para las propiedades que aceptan los componentes
interface ImageProps {
	src: string;
}

// Componente que recibe una función (Render Prop) para renderizar las imágenes
interface ImageGalleryProps {
	images: string[];
	renderImage: (src: string) => JSX.Element;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
	images,
	renderImage,
}) => {
	return (
		<div style={{ display: "flex", gap: "10px" }}>
			{images.map((image) => (
				<div key={image.toString()}>{renderImage(image)}</div>
			))}
		</div>
	);
};

// Efecto de zoom
export const ZoomImage: React.FC<ImageProps> = ({ src }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseOver = () => setIsHovered(true);
	const handleMouseOut = () => setIsHovered(false);
	const handleFocus = () => setIsHovered(true);
	const handleBlur = () => setIsHovered(false);

	return (
		<button
			type="button"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onFocus={handleFocus}
			onBlur={handleBlur}
			style={{
				border: "none",
				background: "none",
				padding: 0,
				cursor: "pointer",
				width: "200px",
				transform: isHovered ? "scale(1.1)" : "scale(1)",
				transition: "transform 0.5s",
			}}
		>
			<img src={src} alt="Zoom effect" />
		</button>
	);
};

// Efecto de rotación
export const RotateImage: React.FC<ImageProps> = ({ src }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseOver = () => setIsHovered(true);
	const handleMouseOut = () => setIsHovered(false);
	const handleFocus = () => setIsHovered(true);
	const handleBlur = () => setIsHovered(false);

	return (
		<button
			type="button"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onFocus={handleFocus}
			onBlur={handleBlur}
			style={{
				border: "none",
				background: "none",
				padding: 0,
				cursor: "pointer",
				width: "200px",
				transform: isHovered ? "rotate(20deg)" : "rotate(0deg)",
				transition: "transform 0.5s",
			}}
		>
			<img src={src} alt="Rotate effect" />
		</button>
	);
};

// Efecto de movimiento abajo
export const MoveDownImage: React.FC<ImageProps> = ({ src }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseOver = () => setIsHovered(true);
	const handleMouseOut = () => setIsHovered(false);
	const handleFocus = () => setIsHovered(true);
	const handleBlur = () => setIsHovered(false);

	return (
		<button
			type="button"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onFocus={handleFocus}
			onBlur={handleBlur}
			style={{
				border: "none",
				background: "none",
				padding: 0,
				cursor: "pointer",
				width: "200px",
				transform: isHovered ? "translateY(20px)" : "translateY(0px)",
				transition: "transform 0.5s",
			}}
		>
			<img src={src} alt="Move down effect" />
		</button>
	);
};
