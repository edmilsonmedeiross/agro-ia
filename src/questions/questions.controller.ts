import { Controller, Post, Body } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionGeminiDto } from './dto/create-question-gemini.dto';
import { CreateQuestionClaudeDto } from './dto/create-question-claude.dto';
@ApiTags('agro-ia')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        messages: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              content: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          option: {
            type: 'number',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
  })
  @Post('gpt')
  createGpt(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createGpt(createQuestionDto);
  }

  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
        },
      },
    },
  })
  @Post('gemini')
  createGemini(@Body() createQuestionGeminiDto: CreateQuestionGeminiDto) {
    return this.questionsService.createGemini(createQuestionGeminiDto);
  }

  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
        },
      },
    },
  })
  @Post('claude')
  createClaude(@Body() createQuestionClaudeDto: CreateQuestionClaudeDto) {
    return this.questionsService.createClaude(createQuestionClaudeDto);
  }
}
