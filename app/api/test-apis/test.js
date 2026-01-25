/**
 * Simple test script to verify if APIs are working
 * Run this from browser console or use curl
 */

// Test Gemini API directly
async function testGeminiAPI() {
  const GEMINI_API_KEY = 'AIzaSyBcbRPk0EQk4SJQ16vXGQ8pZkTrOAknqpM';
  
  console.log('🔍 Testing Gemini API...');
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Test message'
            }]
          }]
        })
      }
    );

    const data = await response.json();
    console.log('📊 Response Status:', response.status);
    console.log('📋 Response:', data);
    
    if (response.ok) {
      console.log('✅ GEMINI API IS WORKING!');
      return true;
    } else {
      console.log('❌ GEMINI API ERROR:', data.error?.message || data);
      return false;
    }
  } catch (error) {
    console.error('❌ GEMINI API CONNECTION FAILED:', error);
    return false;
  }
}

// Test Hugging Face API directly
async function testHuggingFaceAPI() {
  const HF_API_KEY = process.env.HF_TOKEN;
  
  console.log('🔍 Testing Hugging Face API...');
  
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: 'Hello'
        })
      }
    );

    const data = await response.json();
    console.log('📊 Response Status:', response.status);
    console.log('📋 Response:', data);
    
    if (response.ok) {
      console.log('✅ HUGGING FACE API IS WORKING!');
      return true;
    } else {
      console.log('❌ HUGGING FACE API ERROR:', data.error || data);
      return false;
    }
  } catch (error) {
    console.error('❌ HUGGING FACE CONNECTION FAILED:', error);
    return false;
  }
}

// Test chat endpoint
async function testChatEndpoint() {
  console.log('🔍 Testing Chat Endpoint...');
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'How to book appointment?'
      })
    });

    const data = await response.json();
    console.log('📊 Response Status:', response.status);
    console.log('📋 Response:', data);
    console.log('✅ CHAT ENDPOINT WORKING!');
    console.log('Source:', data.source);
    return true;
  } catch (error) {
    console.error('❌ CHAT ENDPOINT ERROR:', error);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('═'.repeat(60));
  console.log('🧪 RUNNING ALL API TESTS');
  console.log('═'.repeat(60));
  
  const results = {
    gemini: await testGeminiAPI(),
    huggingface: await testHuggingFaceAPI(),
    chat: await testChatEndpoint()
  };
  
  console.log('');
  console.log('═'.repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('═'.repeat(60));
  console.log('Gemini API:', results.gemini ? '✅ WORKING' : '❌ NOT WORKING');
  console.log('Hugging Face API:', results.huggingface ? '✅ WORKING' : '❌ NOT WORKING');
  console.log('Chat Endpoint:', results.chat ? '✅ WORKING' : '❌ NOT WORKING');
  console.log('═'.repeat(60));
  
  return results;
}

// Export for use
if (typeof window !== 'undefined') {
  window.runAllTests = runAllTests;
  window.testGeminiAPI = testGeminiAPI;
  window.testHuggingFaceAPI = testHuggingFaceAPI;
  window.testChatEndpoint = testChatEndpoint;
  console.log('✅ Test functions loaded. Run: runAllTests()');
}
