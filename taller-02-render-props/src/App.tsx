import type React from "react";
import {
	ImageGallery,
	ZoomImage,
	RotateImage,
	MoveDownImage,
} from "./components/render-props/image-gallery";
import "./App.css";

// Componente principal
const App: React.FC = () => {
	const images = [
		"https://via.placeholder.com/200",
		"https://via.placeholder.com/200",
		"https://via.placeholder.com/200",
	];
	return (
		<main>
			<div className="container">
				<h1>Gallery with Render Props</h1>

				{/* Galería usando Zoom en las imágenes */}
				<ImageGallery
					images={images}
					renderImage={(src) => <ZoomImage src={src} />}
				/>

				{/* Galería usando Rotación en las imágenes */}
				<ImageGallery
					images={images}
					renderImage={(src) => <RotateImage src={src} />}
				/>
				{/* Galería usando Movimiento abajo en las imágenes */}
				<ImageGallery
					images={images}
					renderImage={(src) => <MoveDownImage src={src} />}
				/>
			</div>
		</main>
	);
};

export default App;
