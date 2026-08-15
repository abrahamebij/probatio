# Probatio — Technical Brief

> **AI-powered Reality Attestation infrastructure built on BOT Chain.**
>
> Verify real-world claims with AI evidence reconciliation, then anchor the result on BOT Chain as a tamper-evident attestation.

## 1. Scope

### Hackathon MVP

Probatio verifies claims about a **single initial RWA vertical: solar-energy production**.

Example:

```text
Claim
"Solar Farm #042 generated 18,421 kWh in July."

        ↓

Evidence
PDF report + CSV meter data + image + metadata

        ↓

AI verification pipeline
Document Agent
Vision Agent
Data Agent
Consistency Agent
Reality Agent

        ↓

Result
91% confidence / VERIFIED

        ↓

BOT Chain
Reality Attestation
```

The product is **not** an RWA marketplace and does not need to tokenise the underlying physical asset.

The core primitive is the **Reality Attestation**.

---

# 2. Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                         NEXT.JS 16                           │
│                                                             │
│  Dashboard  │  Submit Claim  │  Verification  │  Passport  │
│                                                             │
│  TanStack Query ───── API ───── Wallet / Contract Client    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION API                         │
│                                                             │
│  claims/        evidence/        verification/              │
│  attestations/  disputes/        assets/                    │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
       ┌───────────────┐              ┌─────────────────┐
       │ Evidence      │              │ AI Verification │
       │ Storage       │              │ Pipeline        │
       │               │              │                 │
       │ PDFs          │              │ Document Agent  │
       │ Images        │              │ Vision Agent    │
       │ CSV           │              │ Data Agent      │
       └───────────────┘              │ Consistency     │
                                      │ Reality Agent   │
                                      └────────┬────────┘
                                               │
                                               ▼
                                      Verification Result
                                               │
                                               ▼
                                   ┌──────────────────────┐
                                   │ BOT Chain Contract   │
                                   │                      │
                                   │ Reality Attestation  │
                                   │ Disputes             │
                                   │ Status               │
                                   └──────────────────────┘
```

---

# 3. Recommended Codebase

```text
probatio/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── claims/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── verification/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── passports/
│   │   │   └── [assetId]/
│   │   │       └── page.tsx
│   │   └── disputes/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── claims/
│   │   ├── evidence/
│   │   ├── verification/
│   │   ├── attestations/
│   │   └── disputes/
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── claims/
│   ├── verification/
│   ├── evidence/
│   ├── passport/
│   ├── attestations/
│   └── wallet/
│
├── lib/
│   ├── ai/
│   │   ├── agents/
│   │   │   ├── document-agent.ts
│   │   │   ├── vision-agent.ts
│   │   │   ├── data-agent.ts
│   │   │   ├── consistency-agent.ts
│   │   │   └── reality-agent.ts
│   │   ├── orchestrator.ts
│   │   ├── confidence.ts
│   │   └── prompts/
│   │
│   ├── blockchain/
│   │   ├── chain.ts
│   │   ├── client.ts
│   │   ├── contracts.ts
│   │   └── abi/
│   │       └── reality-attestation.ts
│   │
│   ├── db/
│   │   └── ...
│   │
│   ├── evidence/
│   │   ├── hashing.ts
│   │   ├── normalise.ts
│   │   └── storage.ts
│   │
│   └── utils/
│
├── contracts/
│   ├── RealityAttestation.sol
│   └── deploy/
│
├── hooks/
│   ├── use-claims.ts
│   ├── use-verification.ts
│   ├── use-attestation.ts
│   └── use-wallet.ts
│
├── types/
│   ├── claim.ts
│   ├── evidence.ts
│   ├── verification.ts
│   └── attestation.ts
│
├── public/
├── .env.example
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

Do not over-engineer the folder structure. Keep the hackathon implementation easy to navigate.

---

# 4. Frontend Stack

Use:

- **Next.js 16**
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP** for fluid/high-impact animation
- **TanStack Query** for server state
- **react-icons** for icons
- **wagmi + viem** for wallet/blockchain interaction

Prefer **wagmi + viem together**:

- wagmi → React wallet/hooks
- viem → contract reads/writes, clients, encoding and low-level blockchain operations

Do not use shadcn/ui or lucide unless explicitly requested.

The UI/design will be generated separately with **Stitch**. Do not create a design system in this brief or invent a visual language before the Stitch output is available.

---

# 5. Blockchain

## BOT Chain

Target:

```text
Network: BOT Chain Mainnet
Chain ID: 677
RPC: https://rpc.botchain.ai
```

The project must deploy the Reality Attestation contract to BOT Chain Mainnet.

Use the official BOT Chain documentation as the source of truth:

- Developer docs: https://dev-docs.botchain.ai/docs/intro/
- Developer quick guide: https://dev-docs.botchain.ai/docs/Developers/quick-guide/
- EOA Paymaster: https://dev-docs.botchain.ai/docs/Developers/eoa-paymaster/
- Bridge concepts: https://dev-docs.botchain.ai/docs/Bridge/core-concepts/
- BOT Chain main site: https://www.botchain.ai/

Do not assume undocumented BOT Chain functionality.

---

# 6. Smart Contract

Keep the contract intentionally small.

### Core data

```solidity
struct Attestation {
    bytes32 assetId;
    bytes32 claimHash;
    bytes32 evidenceHash;
    uint16 confidence;
    uint8 status;
    uint256 createdAt;
    uint256 updatedAt;
}
```

### Core functions

```solidity
createAttestation(...)
updateAttestation(...)
disputeAttestation(...)
resolveDispute(...)
getAttestation(...)
```

### Events

```solidity
AttestationCreated(...)
AttestationDisputed(...)
AttestationResolved(...)
AttestationUpdated(...)
```

Raw documents and AI outputs should **not** be stored on-chain.

Store hashes and compact verification metadata on BOT Chain.

---

# 7. AI Verification Pipeline

The AI system is the core business logic.

```text
Claim
  ↓
Evidence normalisation
  ↓
┌───────────────┬──────────────┬───────────────┐
│ Document      │ Vision       │ Data          │
│ Agent         │ Agent        │ Agent         │
└───────┬───────┴──────┬───────┴───────┬───────┘
        └───────────────┼──────────────┘
                        ▼
                Consistency Agent
                        │
                        ▼
                  Reality Agent
                        │
                        ▼
             Verification Result
```

Each agent must return structured JSON, not arbitrary prose.

Example:

```ts
{
  status: "verified",
  confidence: 91,
  findings: [],
  contradictions: [],
  evidenceIds: [],
}
```

Do not expose model chain-of-thought in the UI. Show concise, evidence-backed findings instead.

---

# 8. Evidence Model

Evidence exists off-chain.

Supported MVP types:

```text
PDF
CSV
Image
Metadata
```

Every evidence item should have:

```ts
{
  id: string;
  type: "pdf" | "csv" | "image" | "metadata";
  source: string;
  hash: string;
  createdAt: string;
}
```

The final evidence bundle is hashed before creating an on-chain attestation.

---

# 9. Confidence

Do not present AI output as absolute truth.

Use:

```text
VERIFIED
Confidence: 91%
```

rather than:

```text
100% REAL
```

The result must explain:

- supporting evidence
- contradictions
- missing evidence
- confidence
- verification timestamp

---

# 10. Reality Attestation Lifecycle

```text
PENDING
   ↓
VERIFYING
   ↓
VERIFIED
   │
   ├──→ DISPUTED
   │       ↓
   │   RE-VERIFIED
   │
   └──→ REVOKED
```

A dispute must not silently overwrite history.

Each state change should produce an auditable record.

---

# 11. Gasless Attestations

Investigate BOT Chain's **EOA Paymaster** for the attestation transaction.

Ideal UX:

```text
AI Verification
      ↓
91% Confidence
      ↓
Create Attestation
      ↓
Wallet Signature
      ↓
BOT Chain
      ↓
Verified
```

If Paymaster sponsorship cannot be configured for the hackathon environment, fall back to normal BOT gas.

Do not block the core product on Paymaster availability.

---

# 12. Data Flow

### Claim creation

```text
POST /api/claims
```

### Evidence upload

```text
POST /api/evidence
```

### Start verification

```text
POST /api/verification
```

### Get verification

```text
GET /api/verification/:id
```

### Create attestation

```text
POST /api/attestations
```

### Get attestation

```text
GET /api/attestations/:id
```

### Dispute

```text
POST /api/attestations/:id/dispute
```

Keep blockchain writes explicit and auditable.

---

# 13. TanStack Query

Use TanStack Query for:

- claims
- verification status
- evidence
- attestations
- disputes
- asset/passport history

Use query invalidation after:

- verification completion
- attestation creation
- dispute submission
- dispute resolution

Do not use TanStack Query as a replacement for local UI state.

---

# 14. Wallet / Blockchain Rules

Use wagmi for:

- wallet connection
- account state
- chain state
- transaction lifecycle

Use viem for:

- public clients
- contract reads
- contract writes
- encoding/hashing
- transaction preparation

The app must explicitly detect whether the connected wallet is on BOT Chain Mainnet.

Provide a clear network-switch flow.

---

# 15. Environment Variables

Create `.env.example`.

Expected categories:

```env
NEXT_PUBLIC_BOT_CHAIN_RPC=
NEXT_PUBLIC_BOT_CHAIN_CHAIN_ID=677
NEXT_PUBLIC_ATTESTATION_CONTRACT_ADDRESS=

DATABASE_URL=

AI_API_KEY=

STORAGE_ENDPOINT=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
```

Never expose server-side AI, database, storage secrets through `NEXT_PUBLIC_*`.

---

# 16. Package Rule

**DO NOT install packages automatically.**

The coding agent must:

1. Inspect the existing `package.json`.
2. Reuse already-installed dependencies wherever possible.
3. If a package is required and missing, **stop and tell the developer the exact package name and why it is needed**.
4. Do not run `npm install`, `pnpm add`, `yarn add`, or equivalent without explicit permission.

Required/preferred stack:

```text
next
react
typescript
tailwindcss
gsap
@tanstack/react-query
react-icons
wagmi
viem
```

Only request additional dependencies when genuinely necessary.

---

# 17. Implementation Priority

Build in this order:

### Phase 1
Next.js shell + Stitch-generated UI integration.

### Phase 2
Claim/evidence data model and API.

### Phase 3
AI verification pipeline.

### Phase 4
Reality Attestation smart contract.

### Phase 5
BOT Chain Mainnet deployment.

### Phase 6
wagmi/viem wallet + contract integration.

### Phase 7
Reality Passport + attestation history.

### Phase 8
Dispute flow.

### Phase 9
Paymaster investigation/integration.

### Phase 10
Demo polish and GSAP animations.

---

# 18. Definition of Done

The MVP is complete when a judge can:

1. Connect a wallet.
2. Submit a solar-production claim.
3. Upload evidence.
4. Start verification.
5. Watch the verification pipeline complete.
6. See the confidence score and evidence findings.
7. Create an attestation.
8. Sign the transaction.
9. See the attestation confirmed on BOT Chain Mainnet.
10. Open the Reality Passport.
11. View the on-chain attestation.
12. Submit a dispute.
13. See the attestation status change.

The complete flow must work on a **publicly accessible deployment**.

---

# 19. Core Principle

Do not build:

> "An AI chatbot for RWA."

Build:

> **"A programmable verification layer that turns evidence about the physical world into on-chain attestations."**

AI interprets reality.

Probatio reconciles the evidence.

BOT Chain anchors the result.
