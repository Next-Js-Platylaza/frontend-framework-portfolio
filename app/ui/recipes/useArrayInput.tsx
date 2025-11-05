"use client";
import { InputAttributes } from "@/app/lib/definitions";
import { JSX, useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";

export default function useArrayInput(label : string) {
	const [items, setItems] = useState([NewItem("0")]);
	const [itemIDs, setItemIDs] = useState(["0"]);
	const [itemIDToRemove, setItemIDToRemove] = useState("None");

	useEffect(()=> {
		if (itemIDToRemove != "None") {
			onRemoveItem(itemIDToRemove)
		}
	}, [itemIDToRemove]);

	function NewItem(id : string)
	{
		return (
			<ArrayInput
				key={id}
				attributes={{
					name: id,
					type: "text",
					placeholder: `Enter ${label}`,
				}}
				removeComponent={() => {
					setItemIDToRemove(id);
			}}
			/>
		);
	}

	function onAddItem() {
		const uuid = uuidv1();
		setItems([
			...items,
			NewItem(uuid),
		]);
		setItemIDs([...itemIDs, uuid]);
	}
	function onRemoveItem(uuid: string) {
		const index = itemIDs.indexOf(uuid);
		setItems((items) => 
			[...items.slice(0, index), ...items.slice(index+1)]
		);
		setItemIDs((itemIDs) => 
			[...itemIDs.slice(0, index), ...itemIDs.slice(index+1)]
		);
	}
    const values : string[] = [];

    return [(
        <div>
        {items.map((component) => (
					<div key={component.props.attributes.name}>{component}</div>
				))}
				<button type="button" onClick={onAddItem}>
					Add {label[0].toUpperCase() + label.substring(1).toLowerCase()}
				</button>
        </div>
    ), values] as [JSX.Element, string[]];

    //return [items, onAddItem] as [JSX.Element[], (() => void)];
}

function ArrayInput({
	attributes,
	removeComponent,
}: {
	attributes: InputAttributes;
	removeComponent: (name: string) => void;
}) {
	return (
		<div className={attributes?.styles}>
			<input
				className="w-[325px]"
				id={attributes.name}
				name={attributes.name}
				type={attributes.type}
				defaultValue={attributes?.defaultValue}
				placeholder={attributes?.placeholder}
				minLength={attributes?.minLength}
				maxLength={attributes?.maxLength}
				required={attributes?.required}
			/>
			{attributes.name != "0" &&
			<button
				type="button"
				onClick={() => {
					removeComponent(attributes.name);
				}}
			>
				Remove
			</button>
			}
			
		</div>
	);
}