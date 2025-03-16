import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Nav, Tab, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

/**
 * JsonPromptsTab Component
 * 
 * This tab displays AI prompts paired with their JSON configurations.
 * It loads markdown files and JSON files from the data/json-prompts directory.
 */
const JsonPromptsTab = () => {
  const [promptPairs, setPromptPairs] = useState([]);
  const [activePrompt, setActivePrompt] = useState(null);
  const [viewMode, setViewMode] = useState('prompt'); // 'prompt' or 'json'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedInfo, setCopiedInfo] = useState({ id: null, type: null });

  // Load the prompt pairs when the component mounts
  useEffect(() => {
    const loadPromptPairs = async () => {
      try {
        // Define the prompt pairs with their metadata
        const pairs = [
          { 
            id: 'pair1', 
            title: 'Problems and Suggestions', 
            promptPath: '/static/json-prompts/prompt1.md',
            jsonPath: '/static/json-prompts/config1.json'
          },
          { 
            id: 'pair2', 
            title: 'Review Quality', 
            promptPath: '/static/json-prompts/prompt2.md',
            jsonPath: '/static/json-prompts/config2.json'
          },
          { 
            id: 'pair3', 
            title: 'Version Comparison', 
            promptPath: '/static/json-prompts/prompt3.md',
            jsonPath: '/static/json-prompts/config3.json'
          }
        ];
        
        // Fetch the content of each prompt and JSON file
        const loadedPairs = await Promise.all(
          pairs.map(async (pair) => {
            // Fetch the markdown content
            const promptResponse = await fetch(pair.promptPath);
            if (!promptResponse.ok) {
              throw new Error(`Failed to fetch ${pair.promptPath}: ${promptResponse.statusText}`);
            }
            const promptContent = await promptResponse.text();
            
            // Fetch the JSON content
            const jsonResponse = await fetch(pair.jsonPath);
            if (!jsonResponse.ok) {
              throw new Error(`Failed to fetch ${pair.jsonPath}: ${jsonResponse.statusText}`);
            }
            const jsonData = await jsonResponse.json();
            
            return {
              id: pair.id,
              title: pair.title,
              promptContent: promptContent,
              jsonContent: JSON.stringify(jsonData, null, 2)
            };
          })
        );
        
        setPromptPairs(loadedPairs);
        if (loadedPairs.length > 0) {
          setActivePrompt(loadedPairs[0].id);
        }
      } catch (err) {
        console.error('Error loading prompt pairs:', err);
        setError('Failed to load prompt pairs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadPromptPairs();
  }, []);

  // Handle prompt selection
  const handlePromptSelect = (promptId) => {
    setActivePrompt(promptId);
  };

  // Toggle between prompt and JSON view
  const toggleViewMode = () => {
    setViewMode(viewMode === 'prompt' ? 'json' : 'prompt');
  };

  // Find the active prompt pair
  const currentPair = promptPairs.find(p => p.id === activePrompt);

  // Render loading state
  if (loading) {
    return (
      <div className="json-prompts-tab">
        <div className="tab-header">
          <h2>Prompts with JSON Configuration</h2>
          <p>Loading prompt pairs...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="json-prompts-tab">
        <div className="tab-header">
          <h2>Prompts with JSON Configuration</h2>
          <p className="text-danger">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="json-prompts-tab">
      <div className="tab-header">
        <h2>Prompts with JSON Configuration</h2>
        <p>Structured prompts with JSON configuration for machine-readable outputs</p>
      </div>
      
      <Tab.Container id="json-prompts-tabs" activeKey={activePrompt} onSelect={handlePromptSelect}>
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column mb-3">
              {promptPairs.map((pair) => (
                <Nav.Item key={pair.id}>
                  <Nav.Link eventKey={pair.id}>{pair.title}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            
            {currentPair && (
              <Button 
                variant="outline-primary" 
                onClick={toggleViewMode} 
                className="w-100 mb-3"
              >
                {viewMode === 'prompt' ? 'View JSON Configuration' : 'View Prompt'}
              </Button>
            )}
          </Col>
          <Col md={9}>
            <Tab.Content>
              {promptPairs.map((pair) => (
                <Tab.Pane key={pair.id} eventKey={pair.id}>
                  <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <h4>{pair.title} {viewMode === 'json' ? 'JSON Configuration' : 'Prompt'}</h4>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-copy-${pair.id}`}>
                          {copiedInfo.id === pair.id && copiedInfo.type === viewMode ? "Copied!" : "Copy to clipboard"}
                        </Tooltip>}
                      >
                        <Button 
                          variant={copiedInfo.id === pair.id && copiedInfo.type === viewMode ? "success" : "outline-primary"} 
                          size="sm"
                          onClick={() => {
                            const contentToCopy = viewMode === 'prompt' ? pair.promptContent : pair.jsonContent;
                            navigator.clipboard.writeText(contentToCopy)
                              .then(() => {
                                setCopiedInfo({ id: pair.id, type: viewMode });
                                setTimeout(() => {
                                  setCopiedInfo({ id: null, type: null });
                                }, 2000);
                              })
                              .catch(err => {
                                console.error('Failed to copy: ', err);
                              });
                          }}
                        >
                          {copiedInfo.id === pair.id && copiedInfo.type === viewMode ? "Copied!" : `Copy ${viewMode === 'prompt' ? 'Prompt' : 'JSON'}`}
                        </Button>
                      </OverlayTrigger>
                    </Card.Header>
                    <Card.Body>
                      {viewMode === 'prompt' ? (
                        <ReactMarkdown>{pair.promptContent}</ReactMarkdown>
                      ) : (
                        <SyntaxHighlighter language="json" style={docco}>
                          {pair.jsonContent}
                        </SyntaxHighlighter>
                      )}
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default JsonPromptsTab;
