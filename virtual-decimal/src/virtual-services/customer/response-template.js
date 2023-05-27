const responseTemplate = {
    "id": "${row}[id]",
    "firstName": "${row}[first_name]",
    "lastName": "${row}[last_name]",
    "email": "${row}[email]",
    "favColor": "${row}[favorite_color]"
}
module.exports = responseTemplate