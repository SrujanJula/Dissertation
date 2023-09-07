const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');




//setup server
const app = express();
app.use(cors());
app.use(bodyParser.json());

  


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);



// openai endpoint for recipe generation
app.post("/feedback", async (req, res) => {

    console.log(req.body.content)
    const prompt=req.body.content
   

    try {
      async function test(){
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "system", "content": "**\\n\\nYou're a professor mentoring students to enhance project writing. You are going to give points on how they can write project better.Improve the projects structure, grammar, spelling, and technical precision.point out exact sentences and words where the grammar and spelling mistakes are and give the right answers.point out exact technical details where they need to give more details and give pointers about where how accurate the technicals and guide them on how they can make it better.\\n\\n1. **Structure:** Analyze the project's coherence, navigation, introduction clarity, body organization, and conclusion effectiveness.\\n\\n2. **Grammar and Spelling:** Assess linguistic precision and appropriateness for the target audience. Suggest improvements if needed.\\n\\n3. **Technical:** Evaluate technical soundness, methodology robustness, outcome accuracy, and code efficiency. Offer guidance on theoretical accuracy and improvements.\\n\\nAdditionally, provide the Flesch-Kincaid readability score for this text and assess the project's Flesch-Kincaid score.As a mentor, your feedback guides students towards comprehensive project excellence, both in composition and technical prowess. After evaluation and giving guidance, deliver synthesized feedback, highlighting strengths and prescribing enhancements. Conclude by assigning a grade reflecting the project's quality.\""
          },
            {"role": "user", "content":prompt }
          ],
          temperature: 0.5,
          max_tokens: 1500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        console.log(completion.data.choices[0].message);
        res.send(completion.data.choices[0].message.content)
      }
      
      test()
    } catch (err) {
        console.error(err); 
        res.status(500).send({ error: err.message });
    }
    
});


app.post("/researchpaper", async (req, res) => {

  console.log(req.body.inputValue)
  const prompt=`Write 5 Review of Literature For Research Paper or Phd Thesis ${req.body.inputValue} the output should contain in the form json with fields  paper1:[name,author,year_published,brief_view:small paragraph saying brief view,reference_apa_format , paper_link:working link for acessing paper through internet ] ,i know you are a ai model so just give me data in json format without any start or end text`
 

  try {
    async function test(){
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You are a research coordinator to retrieve detailed analysis of research papers according to your knowledge. A user will input the name of a specific  project, and your system should return comprehensive details of papers that need for  the project including links to view papers."
          
          },
          {"role": "user", "content":prompt }
        ],
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(completion.data.choices[0].message.content);
      res.send(completion.data.choices[0].message.content)
    }
    
    test()
  } catch (err) {
      console.error(err); 
      res.status(500).send({ error: err.message });
  }

  
});

app.post("/translate", async (req, res) => {

  console.log(req.body.inputValue)
  const prompt=` Convert this ${req.body.inputValue.inputText}  to ${req.body.inputValue.language}`
 

  try {
    async function test(){
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
        
          {
            "role": "system",
            "content": "You are expert in converting one language to another language so act as language translator and do translations according to requirements"
          
          },
          {"role": "user", "content":prompt }
        ],
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,

      });
      console.log(completion.data.choices[0].message.content);
      res.send(completion.data.choices[0].message.content)
    }
    
    test()
  } catch (err) {
      console.error(err); 
      res.status(500).send({ error: err.message });
  }

  
});





// start the server
app.listen(8080, () => console.log('Server running on port 8080'));
