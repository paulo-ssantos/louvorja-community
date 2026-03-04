import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ToolsService } from './tools.service';

@ApiTags('tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tools' })
  @ApiResponse({ status: 200, description: 'Returns all tools' })
  async findAll(@Query('category') category?: string) {
    return this.toolsService.findAll(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tool by ID' })
  @ApiResponse({ status: 200, description: 'Returns the tool' })
  async findOne(@Param('id') id: string) {
    return this.toolsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new tool' })
  @ApiResponse({ status: 201, description: 'Tool created' })
  async create(@Body() createToolDto: any) {
    return this.toolsService.create(createToolDto);
  }

  @Post(':id/click')
  @ApiOperation({ summary: 'Track tool click' })
  @ApiResponse({ status: 200, description: 'Click tracked' })
  async trackClick(@Param('id') id: string) {
    return this.toolsService.trackClick(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tool' })
  @ApiResponse({ status: 200, description: 'Tool deleted' })
  async remove(@Param('id') id: string) {
    return this.toolsService.remove(id);
  }
}
