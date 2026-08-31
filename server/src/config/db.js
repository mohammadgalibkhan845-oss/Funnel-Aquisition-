import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { initialSeedLeads, initialSequences, initialUsers, initialOutreachTemplates } from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

// In-Memory / File Persistent Store Fallback
class MemoryDbStore {
  constructor() {
    this.state = {
      users: [...initialUsers],
      leads: [...initialSeedLeads],
      audits: [],
      bookings: [],
      sequences: [...initialSequences],
      outreachTemplates: [...initialOutreachTemplates],
      interactions: []
    };
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(STORE_PATH)) {
        const fileContent = fs.readFileSync(STORE_PATH, 'utf-8');
        if (fileContent.trim()) {
          const parsed = JSON.parse(fileContent);
          this.state = { ...this.state, ...parsed };
        }
      } else {
        this.save();
      }
    } catch (err) {
      console.warn('MemoryDbStore initialization warning, using memory state:', err.message);
    }
  }

  save() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(STORE_PATH, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist store.json:', err.message);
    }
  }

  get(collectionName) {
    if (!this.state[collectionName]) {
      this.state[collectionName] = [];
    }
    return this.state[collectionName];
  }

  find(collectionName, filter = {}) {
    const list = this.get(collectionName);
    return list.filter(item => {
      for (const key of Object.keys(filter)) {
        if (item[key] !== filter[key]) return false;
      }
      return true;
    });
  }

  findOne(collectionName, filter = {}) {
    const results = this.find(collectionName, filter);
    return results[0] || null;
  }

  findById(collectionName, id) {
    const list = this.get(collectionName);
    return list.find(item => item.id === id || item._id === id) || null;
  }

  create(collectionName, doc) {
    const list = this.get(collectionName);
    const newDoc = {
      id: doc.id || doc._id || `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...doc
    };
    list.unshift(newDoc);
    this.save();
    return newDoc;
  }

  update(collectionName, id, updateFields) {
    const list = this.get(collectionName);
    const index = list.findIndex(item => item.id === id || item._id === id);
    if (index === -1) return null;
    const updated = {
      ...list[index],
      ...updateFields,
      updatedAt: new Date().toISOString()
    };
    list[index] = updated;
    this.save();
    return updated;
  }

  delete(collectionName, id) {
    const list = this.get(collectionName);
    const index = list.findIndex(item => item.id === id || item._id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.save();
    return true;
  }

  resetToSeed() {
    this.state = {
      users: [...initialUsers],
      leads: [...initialSeedLeads],
      audits: [],
      bookings: [],
      sequences: [...initialSequences],
      outreachTemplates: [...initialOutreachTemplates],
      interactions: []
    };
    this.save();
  }
}

export const dbStore = new MemoryDbStore();

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri && !mongoUri.includes('placeholder')) {
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 4000
      });
      console.log('✅ Connected to MongoDB Atlas successfully.');
      return { type: 'mongodb' };
    } catch (err) {
      console.warn('⚠️ MongoDB Atlas connection error. Falling back to persistent MemoryStore:', err.message);
      return { type: 'memory-store', fallback: true };
    }
  } else {
    console.log('ℹ️ Operating in Standalone/Fast-Memory mode with local JSON persistence.');
    return { type: 'memory-store' };
  }
}
