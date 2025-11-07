"use client";
import { InputAttributes } from "@/app/lib/definitions";
import { JSX, useEffect, useRef, useState } from "react";
import { JsxElement } from "typescript";
import { v1 as uuidv1 } from "uuid";

interface ComponentClasses {
	rootDiv?: string;
	inputDivParent?: string;
	inputDiv?: string;
	input?: string;
	addButton?: string;
	removeButton?: string;
}
export default function useArrayInput(
	label: string,
	key: string,
	defaultValues: string[],
	classes?: ComponentClasses,
	inputMinMaxLength: [number, number] = [1, 5],
) {
	const firstID: string = key + "-first";
	const [items, setItems] = useState([NewItem(firstID)]);
	const [itemIDs, setItemIDs] = useState([firstID]);
	const [itemIDToRemove, setItemIDToRemove] = useState("None");

	useEffect(() => {
		if (itemIDToRemove != "None") {
			onRemoveItem(itemIDToRemove);
		}
	}, [itemIDToRemove]);

	function onSubmitForm() {
		if (!defaultValues || defaultValues.length <= 0) return;

		let newItems: JSX.Element[] = [];
		let newItemIDs: string[] = [];

		let isFirst: boolean = true;
		defaultValues?.forEach((value) => {
			const id: string = isFirst ? firstID : uuidv1();
			newItems = [...newItems, NewItem(id, value)];
			newItemIDs = [...newItemIDs, id];
			isFirst = false;
		});

		setItems(newItems);
		setItemIDs(newItemIDs);
	}

	function NewItem(id: string, defaultValue?: string) {
		return (
			<ArrayInput
				key={id}
				attributes={{
					id: id,
					label: label,
					type: "text",
					defaultValue: defaultValue,
					placeholder: `Enter ${label}`,
					minLength: inputMinMaxLength[0],
					maxLength: inputMinMaxLength[1],
					required: true,
					removable: id != firstID,
					divStyles: classes?.inputDiv,
					inputStyles: classes?.input,
					removeButtonStyles: classes?.removeButton,
				}}
				removeComponent={() => {
					setItemIDToRemove(id);
				}}
			/>
		);
	}

	function onAddItem() {
		const uuid = uuidv1();
		setItems([...items, NewItem(uuid)]);
		setItemIDs([...itemIDs, uuid]);
	}
	function onRemoveItem(uuid: string) {
		const index = itemIDs.indexOf(uuid);
		setItems((items) => [
			...items.slice(0, index),
			...items.slice(index + 1),
		]);
		setItemIDs((itemIDs) => [
			...itemIDs.slice(0, index),
			...itemIDs.slice(index + 1),
		]);
	}

	return [
		<div className={classes?.rootDiv} key={key}>
			{items.map((inputArray) => (
				<div
					className={classes?.inputDivParent}
					key={inputArray.props.attributes.id}
				>
					{inputArray}
				</div>
			))}
			<button
				className={classes?.addButton}
				type="button"
				onClick={onAddItem}
			>
				Add {label[0].toUpperCase() + label.substring(1).toLowerCase()}
			</button>
		</div>,
		onSubmitForm,
	] as [JSX.Element, () => void];

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
		<div className={`${attributes?.divStyles} flex gap-3`}>
			<label
				htmlFor={attributes.id}
				aria-label={`Input ${attributes.label}`}
			/>
			<input
				className={attributes?.inputStyles}
				id={`${attributes.label}${attributes.id}`}
				name={`${attributes.label}s`}
				type={attributes.type}
				defaultValue={attributes.defaultValue}
				placeholder={attributes?.placeholder}
				minLength={attributes?.minLength}
				maxLength={attributes?.maxLength}
				required={attributes?.required}
			/>
			{attributes.removable && (
				<button
					className={attributes?.removeButtonStyles}
					type="button"
					onClick={() => {
						removeComponent(attributes.id);
					}}
				>
					Remove
				</button>
			)}
		</div>
	);
}
