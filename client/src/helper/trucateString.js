export default function truncateString(string, limit) {
	return string && string.length > limit
		? `${string.slice(0, limit)}...`
		: string;
}
