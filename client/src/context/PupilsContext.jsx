import { PupilsContext } from "#src/hooks/usePupils.js";
export function PupilsProvider({ children, value }) {
	return (
		<PupilsContext.Provider value={value}>{children}</PupilsContext.Provider>
	);
}
