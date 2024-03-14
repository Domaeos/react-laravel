import { FormControl, TextField, OutlinedInput, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";
import { submitTicket } from "../../api/api";

export const ThreadReply = ({ threadId, setThreads }) => {
    const [description, setDescription] = useState("");

    function handleClick(e) {
        e.preventDefault();
        submitTicket(description, threadId).then((newReply) => {
            setThreads((old) => [...old].push(newReply));
        });
    }

    return (
        <>
            <form noValidate autoComplete="off" className="thread-reply-form">
                <FormControl sx={{ width: "100%" }}>
                    <TextareaAutosize
                        className="thread-input-description"
                        aria-label="description"
                        minRows={5}
                        id="description"
                        label="Description"
                        placeholder="Enter a reply"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        disabled={!Boolean(description.length)}
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
