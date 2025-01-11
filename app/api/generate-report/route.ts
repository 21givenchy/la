import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';


const client = new Groq({
  apiKey: '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', // Use your actual API key
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json(); // Get the prompt from the request body

    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a ESG report generation assistant for frontforumfocus tasked with producing a well-formatted financlial ESG report for bank of America given parsed context.Add financial metrics of your own required by industry reporting standards such as GRI  and also talk about activities that led to this resuctions and their mapping to the SDGs. Here is what you shoul report on We disclose our strategy, policies and practices in our Annual Report and Proxy Statement. ESG content includes Stakeholder Capitalism Metrics developed by the International Business Council (IBC) of the World Economic Forum. Our CEO chairs the IBC and partnered closely on the development of these metrics.Sustainability Accounting Standards Board (SASB) set forth by an independent non-profit whose mission is to develop and disseminate sustainability accounting standards that help public corporations disclose material information that is useful to investor decisions Human Capital Management content You will be given context from one or more reports that take the form of parsed text.You are responsible for producing a report with interleaving text and images - in the format of interleaving text and "image" blocks.Since you cannot directly produce an image, the image block takes in a file path - you should write in the file path of the image instead.How do you know which image to generate? Each context chunk will contain metadata including an image render of the source chunk, given as a file path. Include ONLY the images from the chunks that have heavy visual elements (you can get a hint of this if the parsed text contains a lot of tables).You MUST include at least one image block in the output.You MUST output your response  to adhere to the required output format. Do NOT give back normal text.' },
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile', // Use the appropriate model
    });

    const reportContent = response.choices[0].message.content;
    return NextResponse.json({ report: reportContent });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
