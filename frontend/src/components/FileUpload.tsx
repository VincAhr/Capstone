import {ChangeEvent, FormEvent, useState} from "react";
import {useAuth} from "../auth/AuthProvider";

interface FileUploadProps {
    importState: any
}

export default function FileUpload (props: FileUploadProps) {

    const {token} = useAuth()
    const [file, setFile] = useState<File | undefined>(undefined);
    const fileReader = new FileReader();
    const [error, setError] = useState("")

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
        setError("")
    };

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (file) {
            const readAsTextPromise = new Promise<string>((resolve) => {
                fileReader.onload = function (event) {
                    const csvOutput = event.target?.result as string;
                    resolve(csvOutput);
                };
            });

            fileReader.readAsText(file);
            const csvOutput = await readAsTextPromise;

            const formData = new FormData();
            const blob = new Blob([csvOutput], { type: 'text/csv' });
            formData.append('file', blob, file.name);

                try {
                    const response = await fetch('/stock/csv', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    });

                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
                } catch (error: any) {
                    console.error(error.message);
                }
            props.importState(true)
        } else {
            setError("csv is missing, please choose an csv file")
        }
    };

    return (
        <div style={{textAlign: "center"}}>
            <h2> CSV Import</h2>
            <form>
                <input type="file"
                       id="csvFileInput"
                       accept=".csv"
                       onChange={handleOnChange}
                />
                <button onClick={(e) => {
                    handleOnSubmit(e);
                }}>
                    Import csv
                </button>
            </form>
            {error}
        </div>
    );
}