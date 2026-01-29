import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, employees, phone, web, message } = body

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Nommy Demo <onboarding@resend.dev>", // Replace with your verified domain
      to: ["ventas@nommy.mx"],
      subject: `Nueva solicitud de DEMO - ${company}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #4db8c4 0%, #1e3a5f 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 20px;
                padding: 15px;
                background: white;
                border-radius: 6px;
                border-left: 4px solid #4db8c4;
              }
              .label {
                font-weight: bold;
                color: #1e3a5f;
                margin-bottom: 5px;
              }
              .value {
                color: #555;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎯 Nueva Solicitud de DEMO</h1>
                <p>Un cliente potencial está interesado en Nommy</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Nombre Completo</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">📧 Correo Electrónico</div>
                  <div class="value">${email}</div>
                </div>
                
                <div class="field">
                  <div class="label">🏢 Empresa</div>
                  <div class="value">${company}</div>
                </div>
                
                <div class="field">
                  <div class="label">👥 Número de Empleados</div>
                  <div class="value">${employees}</div>
                </div>
                
                ${
                  phone
                    ? `
                <div class="field">
                  <div class="label">📱 Teléfono</div>
                  <div class="value">${phone}</div>
                </div>
                `
                    : ""
                }
                
                ${
                  web
                    ? `
                <div class="field">
                  <div class="label">🌐 Sitio Web</div>
                  <div class="value">${web}</div>
                </div>
                `
                    : ""
                }
                
                ${
                  message
                    ? `
                <div class="field">
                  <div class="label">💬 Mensaje</div>
                  <div class="value">${message}</div>
                </div>
                `
                    : ""
                }
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[v0] Error sending email:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    console.log("[v0] Email sent successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error in API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
