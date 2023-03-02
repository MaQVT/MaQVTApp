export const getMailTemplate = (title, message, link, linkText) => {
    const template = `<!DOCTYPE html>
    <html>
      <head>
        <title>Your Email Title</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin: 0; padding: 0; background-color: #f2f2f2;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding: 20px 0 30px 0">
              <img
                src="https://uploads-ssl.webflow.com/61a614d52bcb6a6e07cceb22/61c1c0daad35eb29ff90e436_612373fba0ed04e56d856a9e_MAIN-Interview---Emmanuelle-Bessez---Wunjo---Cabinet-RH---QVT---2021---Permis-de-bouger.jpeg"
                alt="Your Logo"
                width="200"
                style="display: block"
              />
            </td>
          </tr>
        </table>
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          bgcolor="#ffffff"
        >
          <tr>
            <td align="center" style="padding: 20px 0 30px 0">
              <h1
                style="color: #333333; font-size: 28px; font-weight: 700; margin: 0"
              >
                {title}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px">
              <p style="color: #666666; font-size: 16px; line-height: 1.5em; width: 500px; text-align: center;margin: auto; margin-bottom: 15px;">
                {message}
              </p>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 20px 0">
                    <a
                      href="{link}"
                      target="_blank"
                      style="
                        background-color: #008cff;
                        border: none;
                        color: #ffffff;
                        font-size: 18px;
                        font-weight: 600;
                        padding: 12px 40px;
                        text-decoration: none;
                        border-radius: 4px;
                      "
                      >{linkText}</a
                    >
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          bgcolor="#f2f2f2"
        >
          <tr>
            <td align="center" style="padding: 20px">
              <p style="color: #666666; font-size: 14px; margin: 0">
              Vous avez reçu cet e-mail car vous vous êtes inscrit à notre service.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
    const text = template.replace('{title}', title).replace('{link}', link).replace('{message}', message).replace('{linkText}', linkText);

    return text;
};
