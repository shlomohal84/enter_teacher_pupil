import { createContext, useContext } from "react";

export const PupilsContext = createContext(null);
export function usePupils() {
	const context = useContext(PupilsContext);
	if (!context) {
		throw new Error("usePupils must be used within a PupilsProvider");
	}
	return context;
}
