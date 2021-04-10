import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { urlGenerator } from "../../helper";
import GalleryFilter from "./GalleryFilter";
import GalleryItem from "./GalleryItem";

const Gallery = () => {
	const { user } = useAuthStore();
	const [results, setResults] = useState([]);
	const [locationValues, setLocationValues] = useState([]);
	const [typeValues, setTypeValues] = useState([]);
	const locationValuesList = locationValues
		? locationValues.map(({ value }) => value)
		: [];
	const typeValuesList = typeValues
		? typeValues.map(({ value }) => value)
		: [];
	const urlData = [
		{
			type: "location",
			values: locationValuesList,
		},
		{
			type: "type",
			values: typeValuesList,
		},
	];

	const initialRender = useRef(true);

	useEffect(() => {
		const fetchCharts = async () => {
			const { user_id } = user;
			const options = {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			};

			const url = urlGenerator(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/api/user/${user_id}/charts?page=1&limit=3&`,
				urlData
			);

			const response = await fetch(url, options);

			if (!response.ok) {
				const { error } = await response.json();
				console.log(error);
				return null;
			} else {
				const { results } = await response.json();
				setResults(results);
			}
		};
		if (initialRender.current) {
			initialRender.current = false;
		} else {
			if (typeValues.length || locationValues.length) {
				try {
					fetchCharts();
				} catch (e) {
					console.log(e);
				}
			}
		}
		// eslint-disable-next-line
	}, [typeValues, locationValues, user]);

	const Results = results.map((data, i) => {
		return (
			<div key={data.id}>
				{/* <pre>
                    <code>
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre> */}
				<GalleryItem data={data} />
			</div>
		);
	});

	return (
		<div className="content-wrapper">
			<div className="d-flex flex-column gallery-container p-3">
				<div className="gallery-filter-container d-flex">
					<GalleryFilter
						locationValues={locationValues}
						typeValues={typeValues}
						setLocationValues={setLocationValues}
						setTypeValues={setTypeValues}
					/>
				</div>
				<div className="gallery-filter-results">{Results}</div>
			</div>
		</div>
	);
};

export default Gallery;
