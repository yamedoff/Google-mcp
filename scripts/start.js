#!/usr/bin/env node
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const path = require('node:path');

const serverPath = path.resolve(__dirname, '..', 'workspace-server', 'dist', 'index.js');
require(serverPath);
