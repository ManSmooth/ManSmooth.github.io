import type { Readable, Writable } from 'svelte/store';

export function readStore<T>(store: Readable<T> | Writable<T>) {
	let value: T | undefined = undefined;
	const unsubscribe = store.subscribe((v) => {
		value = v;
	});
	unsubscribe();
	return value;
}
