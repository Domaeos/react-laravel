import { FormControl, TextField, OutlinedInput, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";
import { submitTicket } from "../../api/api";

export const NewTicket = () => {
    const [description, setDescription] = useState("");

    function handleClick(e) {
        e.preventDefault();
        const wordCount = description.split(" ").length;
        // if (wordCount < 10) {
        //     console.log("Deal with less than 10 words error");
        // } else {
        submitTicket(description);
        // }
    }
    return (
        <>
            <h1>New ticket</h1>
            <form noValidate autoComplete="off">
                <FormControl sx={{ width: "25ch" }}>
                    <TextareaAutosize
                        aria-label="description"
                        minRows={3}
                        id="description"
                        label="Description"
                        placeholder="Describe your issue"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        onClick={handleClick}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </FormControl>
            </form>
        </>
    );
};
