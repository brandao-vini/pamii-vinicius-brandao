            export async function POST(request: Request): Promise<Response> {
            const { email, password } = await request.json();

            if(email === "coffebusy@gmail.com" && password === "123"){
                return new Response(
                JSON.stringify({
                email,
                name: "Gabriel Fernandes",
                }),
                {
                headers: { "Content-Type": "application/json" },
                })
            }
            return new Response ("Usuario e/ou senha Incorreta!" ,{
                status: 404,
                headers: {
                    "content-type" : "text/plain",
                }
            }

            )
            }