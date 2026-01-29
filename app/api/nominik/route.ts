import { NextResponse } from "next/server"
import { Resend } from "resend"
import { NominikChatbot } from "./nominik"
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const { error } = await resend.emails.send({
      from: "Nominik <onboarding@resend.dev>",
      to: "ventas@nommy.mx",
      subject: "Nuevo Lead de nominik - Solicitud de Demo",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2C5F6F 0%, #4db8a8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #2C5F6F; margin-bottom: 5px; }
              .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #4db8a8; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🤖 Nuevo Lead de nominik</h1>
                <p>Un cliente potencial está interesado en una demo</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Nombre:</div>
                  <div class="value">${data.nombre}</div>
                </div>
                
                <div class="field">
                  <div class="label">🏢 Empresa:</div>
                  <div class="value">${data.empresa}</div>
                </div>
                
                <div class="field">
                  <div class="label">📧 Correo:</div>
                  <div class="value">${data.correo}</div>
                </div>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                
                <h3 style="color: #2C5F6F;">Información del Lead:</h3>
                
                <div class="field">
                  <div class="label">🎯 Solución buscada:</div>
                  <div class="value">${data.solucion}</div>
                </div>
                
                <div class="field">
                  <div class="label">💢 Dolor principal:</div>
                  <div class="value">${data.dolor}</div>
                </div>
                
                <div class="field">
                  <div class="label">👥 Tamaño de empresa:</div>
                  <div class="value">${data.tamano} colaboradores</div>
                </div>
                
                <div class="field">
                  <div class="label">⚙️ Solución actual:</div>
                  <div class="value">${data.solucionActual}</div>
                </div>
                
                <div class="field">
                  <div class="label">⏰ Intención de cambio (90 días):</div>
                  <div class="value">${data.intencion}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: "Error sending email" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
