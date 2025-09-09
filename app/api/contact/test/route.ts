import { NextResponse } from 'next/server';

// TEST ENDPOINT - samo loguje podatke, ne šalje pravi email
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('=================================');
    console.log('📧 TEST MODE - Email bi bio poslan:');
    console.log('=================================');
    console.log('Od:', body.name, `<${body.email}>`);
    console.log('Telefon:', body.phone);
    console.log('Servis:', body.service);
    console.log('Poruka:', body.message);
    console.log('Jezik:', body.locale);
    console.log('=================================');
    
    // Simuliramo uspješno slanje
    return NextResponse.json(
      { 
        success: true, 
        message: 'TEST MODE: Email logged to console (not sent)' 
      },
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { error: 'Test endpoint error' },
      { status: 500 }
    );
  }
}