import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content

sendGridClient = sendgrid.SendGridAPIClient('sendgridapi')


def sendEmail(errorMessage, to_email, outputFile, phoneNumber):
    from_email = Email("from")
    subject = "subject"
    content = Content("text/plain", str(errorMessage))
    mail = Mail(from_email, to_email, subject, content)
    mail_json = mail.get()

    response = sendGridClient.client.mail.send.post(request_body=mail_json)
    outputFile.write('Text for ' + phoneNumber + ' status code: ' + str(response.status_code) + '\n')


def sendEmailAlerts(errorMessage, outputFile):
    sendEmail(errorMessage, To("email"), outputFile, 'phone')
    sendEmail(errorMessage, To("email"), outputFile, 'phone')
