import * as Yup from "yup";

export const gameSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    playerCount: Yup.string().required("Required"),
    roundCount: Yup.string().required("Required"),
    public: Yup.string().required("Required"),
});
