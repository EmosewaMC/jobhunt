import type { Signal } from "@preact/signals";
import { Handlers } from "$fresh/server.ts";
import { Button } from "../components/Button.tsx";
import Input from "../components/Input.tsx";

export interface NetworkProps {
	playerData: Array<string>;
}

export function NetworkButton() {
  return (
	<form method="POST" onSubmit={ () => console.log("Submit") }>
    	<div class="flex gap-8 py-6">
		  <Input placeholder="test" name="connection_name"/>
    	  <Button onClick={() => console.log("Add")} type="submit">Add Connection</Button>
    	</div>
	</form>
  );
}

export function NetworkList(props: NetworkProps) {
	return (
		<div class="flex gap-8 py-6">
			<ul>{props.playerData.map(player => <li>{player}</li>)}</ul>
		</div>
	);
  }
