import { PageProps } from "$fresh/server.ts";
import { language_translate } from "gameData/locale.ts";

export default function Greet(props: PageProps) {
	console.log(props);
	return <div>Hello {props.params.name}</div>;
}
