"use client";
import { InputAttributes } from "@/app/lib/definitions";

export default function ArrayInput({
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
