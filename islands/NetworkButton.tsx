import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import Input from "../components/Input.tsx";

// interface CounterProps {
//   count: Signal<number>;
// }

export default function NetworkButton() {
  return (
	<form method="POST" onSubmit={ () => console.log("Submit") }>
    	<div class="flex gap-8 py-6">
    	  <Button onClick={() => console.log("Add")} type="submit">Add Connection</Button>
		  <Input placeholder="test" name="connection_name"/>
    	</div>
	</form>
  );
}
