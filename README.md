The application uses environment variables to manage configuration settings. These variables are defined in a file named `.env` in the root directory of the project. Here are the variables used in this project:

- `PORT`: The port on which the server runs. Default is `3000`.
- `SMTP_HOST`: The SMTP server host used for sending emails. For example, `smtp.gmail.com` for Gmail.
- `SMTP_PORT`: The port used by the SMTP server. Usually `587` for TLS or `465` for SSL.
- `SMTP_USER`: The email address used to send emails.
- `SMTP_PASS`: The password for the email account used to send emails.
- `SMTP_SECURE`: A boolean (`true` or `false`) indicating whether to use a secure connection. Typically `false` for TLS and `true` for SSL.

### Example `.env` file

```env
PORT=3000
SMTP_HOST=smtp.domain.com
SMTP_PORT=587
SMTP_USER=noreply@domain.com
SMTP_PASS=rypx resj ocsr yatq
SMTP_SECURE=false
