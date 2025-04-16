import { create } from "zustand";

const userStore = create((set) => ({

    data: null,
    loading: false,
    error: null,

    fetchData: async (apiUrl) => {
        set({ loading: true, error: null});
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json()
            set({data: jsonData, loading: false })
        } catch (error) {
            set({error: error.message, loading: false})
        }
    }, 

    updateData: (newData) => {
        set({ data: newData});
    },

    resetState: () => {
        set({ data: null, loading: false, error: null})
    }

}));

export default userStore