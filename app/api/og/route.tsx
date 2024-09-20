import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        // Dynamic params
        const title = searchParams.get('title') || 'HolyPlant'
        const description = searchParams.get('description') || 'Your Trusted Plant Sitting Service'

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F0FDF4',
                        fontSize: 32,
                        fontWeight: 600,
                    }}
                >
                    <div style={{ marginBottom: 24, color: '#15803d' }}>🌿 HolyPlant</div>
                    <div
                        style={{
                            color: '#166534',
                            fontSize: 64,
                            fontWeight: 'bold',
                            maxWidth: '80%',
                            textAlign: 'center',
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            color: '#166534',
                            fontSize: 36,
                            maxWidth: '80%',
                            textAlign: 'center',
                            marginTop: 24,
                        }}
                    >
                        {description}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (e: unknown) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        })
    }
}