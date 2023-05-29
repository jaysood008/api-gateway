function formattedTime() {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const now = new Date();
	const date =
		now.getDate() +
		"-" +
		monthNames[now.getMonth()] +
		"-" +
		now.getUTCFullYear();
	const time =
		now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	return date + " " + time;
}

const panSuccessResponseTemplate = {
    "status": "${row}[status]",
    "statusCode": "${row}[status_code]",
    "message": "Successfully Executed!",
    "response": [
        {
            "action": "verify_with_source",
            "completed_at": `${formattedTime()}`,
            "created_at": `${formattedTime()}`,
            "group_id": "81611c3c-d38b-40ad-b536-b0178d2a0094",
            "request_id": "b2a913fb-6daa-4f39-b3b3-439f5702cfcb",
            "result": {
                "source_output": {
                    "first_name": "${row}[first_name]",
                    "gender": "${row}[gender]",
                    "id_number": "${row}[panNumber]",
                    "last_name": "${row}[last_name]",
                    "middle_name": "${row}[middle_name]",
                    "name_on_card": "${row}[name_on_card]",
                    "source": "NSDL",
                }
            },
            "status": "completed",
            "task_id": "52e5e023-38a3-4443-b204-d0778298ddb6",
            "type": "ind_pan"
        }
    ]
}

module.exports = panSuccessResponseTemplate